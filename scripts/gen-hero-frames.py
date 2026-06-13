#!/usr/bin/env python3
"""
Generate a scroll-scrub frame sequence for the FreightFlow cinematic hero.

This is the "scroll-cinematic" canvas image-sequence technique (Apple/Awwwards
style): a short cinematic move is exported to numbered JPGs, preloaded, and the
frame painted to a <canvas> is chosen by scroll progress.

Higgsfield generated the hero keyframe (a glossy-black semi on a sea of clouds).
Because the free-tier credit balance can't cover a 1080p video render, we
synthesize the cinematic move here in code: an eased dolly push-in toward the
truck, pulsing amber headlight glow, a gentle vignette and per-frame film grain.
Swapping in a true Higgsfield 3D clip later is just a matter of replacing the
frames in public/frames/hero/ (the engine is identical).

Usage: python3 scripts/gen-hero-frames.py [source.png] [out_dir] [frame_count]
"""
import os
import sys
import numpy as np
from PIL import Image

SRC   = sys.argv[1] if len(sys.argv) > 1 else "/tmp/hero/source.png"
OUT   = sys.argv[2] if len(sys.argv) > 2 else "public/frames/hero"
N     = int(sys.argv[3]) if len(sys.argv) > 3 else 150

OUT_W, OUT_H = 1600, 900          # 16:9 scrub frames
AR = OUT_W / OUT_H
QUALITY = 78
ZOOM_END = 1.20                   # push-in amount over the whole scroll
FOCAL = (0.52, 0.60)              # normalized point we dolly toward (truck cab)
WARM = np.array([255.0, 172.0, 68.0])   # headlight color (additive)

# Amber light sources in normalized SOURCE coords: (x, y, sigma_px, weight)
LIGHTS = [
    (0.400, 0.710, 70, 1.00),     # left headlight
    (0.515, 0.720, 70, 1.00),     # right headlight
    (0.458, 0.805, 150, 0.55),    # forward glow cast on the clouds
    (0.500, 0.340, 16, 0.30),     # cab-roof marker lights
    (0.553, 0.340, 16, 0.30),
    (0.606, 0.345, 16, 0.30),
]


def ease_in_out(t):
    return 4 * t**3 if t < 0.5 else 1 - (-2 * t + 2)**3 / 2


def main():
    os.makedirs(OUT, exist_ok=True)
    for f in os.listdir(OUT):
        if f.startswith("frame_") and f.endswith(".jpg"):
            os.remove(os.path.join(OUT, f))

    src = np.asarray(Image.open(SRC).convert("RGB"), dtype=np.float32)
    H, W, _ = src.shape

    # Precompute the (static-position) glow field once; per frame we only scale it.
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    glow = np.zeros((H, W), dtype=np.float32)
    for nx, ny, sigma, wgt in LIGHTS:
        cx, cy = nx * W, ny * H
        glow += wgt * np.exp(-(((xx - cx) ** 2 + (yy - cy) ** 2) / (2 * sigma ** 2)))

    # Output-space vignette (gentle — this is a light, bright hero) and grain rng.
    oyy, oxx = np.mgrid[0:OUT_H, 0:OUT_W].astype(np.float32)
    d = np.sqrt(((oxx - OUT_W / 2) / (OUT_W / 2)) ** 2 + ((oyy - OUT_H / 2) / (OUT_H / 2)) ** 2)
    vignette = (1.0 - 0.14 * np.clip(d - 0.55, 0, 1) ** 2)[:, :, None]
    rng = np.random.default_rng(7)

    total_bytes = 0
    for i in range(N):
        t = i / (N - 1)
        e = ease_in_out(t)
        zoom = 1.0 + (ZOOM_END - 1.0) * e

        # Pulsing, intensifying-on-approach glow.
        pulse = (0.82 + 0.20 * np.sin(2 * np.pi * 1.5 * t)) * (1.0 + 0.55 * e)
        frame_full = np.clip(src + glow[:, :, None] * WARM[None, None, :] * pulse, 0, 255)

        # Crop window (output aspect), centered between image-center and the focal point.
        cw = min(W, H * AR) / zoom
        ch = cw / AR
        fx = (0.5 + (FOCAL[0] - 0.5) * 0.7 * e) * W
        fy = (0.5 + (FOCAL[1] - 0.5) * 0.7 * e) * H
        left = float(np.clip(fx - cw / 2, 0, W - cw))
        top = float(np.clip(fy - ch / 2, 0, H - ch))

        crop = Image.fromarray(frame_full.astype(np.uint8)).crop(
            (round(left), round(top), round(left + cw), round(top + ch))
        ).resize((OUT_W, OUT_H), Image.LANCZOS)

        arr = np.asarray(crop, dtype=np.float32) * vignette
        arr += rng.normal(0, 2.6, arr.shape)        # film grain
        out = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))

        path = os.path.join(OUT, f"frame_{i + 1:04d}.jpg")
        out.save(path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        total_bytes += os.path.getsize(path)

    # A graded poster for reduced-motion / first paint / OG.
    Image.open(os.path.join(OUT, "frame_0001.jpg")).save(
        "public/hero-cinematic.jpg", "JPEG", quality=86, optimize=True, progressive=True
    )
    print(f"Wrote {N} frames to {OUT} ({total_bytes/1e6:.1f} MB total, "
          f"{total_bytes/N/1024:.0f} KB/frame). FRAME_COUNT = {N}")


if __name__ == "__main__":
    main()
