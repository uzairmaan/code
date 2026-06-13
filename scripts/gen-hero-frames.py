#!/usr/bin/env python3
"""
Generate a scroll-scrub frame sequence for the FreightFlow cinematic hero.

This is the "scroll-cinematic" canvas image-sequence technique (Apple/Awwwards
style): a short cinematic move is exported to numbered JPGs, preloaded, and the
frame painted to a <canvas> is chosen by scroll progress.

Higgsfield generated the hero keyframe (a glossy-black semi on a sea of clouds).
Because the free-tier credit balance can't cover a 1080p video render, we
synthesize the cinematic move here in code: an easeOut dolly push-in toward the
truck with a slight lateral arc, pulsing amber headlight glow, a gentle vignette
and subtle film grain. Swapping in a true Higgsfield 3D clip later is just a
matter of replacing the frames in public/frames/hero/ (the engine is identical).

Quality-first: frames render at 2048x1152, near-native to the 2752px source so
there's almost no upscaling on retina displays. easeOut mapping makes scrolling
feel responsive immediately (a flat easeIn start is what read as "slow").

Usage: python3 scripts/gen-hero-frames.py [source.png] [out_dir] [frame_count]
"""
import os
import sys
import numpy as np
from PIL import Image

SRC   = sys.argv[1] if len(sys.argv) > 1 else "/tmp/hero/source.png"
OUT   = sys.argv[2] if len(sys.argv) > 2 else "public/frames/hero"
N     = int(sys.argv[3]) if len(sys.argv) > 3 else 140

OUT_W, OUT_H = 2048, 1152          # 16:9, near-native to the 2752px source
AR = OUT_W / OUT_H
QUALITY = 92
ZOOM_START, ZOOM_END = 1.06, 1.34  # stronger, more cinematic push-in
FOCAL = (0.55, 0.62)               # point we dolly toward (truck cab) — slight arc
WARM = np.array([255.0, 174.0, 70.0])    # headlight color (additive)

# Amber light sources in normalized SOURCE coords: (x, y, sigma_px, weight)
LIGHTS = [
    (0.400, 0.710, 60, 1.00),     # left headlight (tight = crisp lamp)
    (0.515, 0.720, 60, 1.00),     # right headlight
    (0.458, 0.800, 140, 0.34),    # restrained forward glow on the clouds
    (0.500, 0.340, 15, 0.26),     # cab-roof marker lights
    (0.553, 0.340, 15, 0.26),
    (0.606, 0.345, 15, 0.26),
]


def ease(t):
    # easeOutCubic — fast, responsive start that settles at the end.
    return 1 - (1 - t) ** 3


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
    vignette = (1.0 - 0.12 * np.clip(d - 0.55, 0, 1) ** 2)[:, :, None]
    rng = np.random.default_rng(7)

    total_bytes = 0
    for i in range(N):
        t = i / (N - 1)
        e = ease(t)
        zoom = ZOOM_START + (ZOOM_END - ZOOM_START) * e

        # Pulsing, gently intensifying-on-approach glow (classy, not flashy).
        pulse = (0.86 + 0.14 * np.sin(2 * np.pi * 1.5 * t)) * (1.0 + 0.40 * e)
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
        arr += rng.normal(0, 1.8, arr.shape)        # subtle film grain
        out = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))

        path = os.path.join(OUT, f"frame_{i + 1:04d}.jpg")
        out.save(path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        total_bytes += os.path.getsize(path)

    # A graded poster for reduced-motion / first paint / OG.
    Image.open(os.path.join(OUT, "frame_0001.jpg")).save(
        "public/hero-cinematic.jpg", "JPEG", quality=92, optimize=True, progressive=True
    )
    print(f"Wrote {N} frames to {OUT} ({total_bytes/1e6:.1f} MB total, "
          f"{total_bytes/N/1024:.0f} KB/frame). FRAME_COUNT = {N}")


if __name__ == "__main__":
    main()
