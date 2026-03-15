"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";

const SPRITE_WIDTH = 32;
const SPRITE_HEIGHT = 32;
const SCALE = 1;
const SPEED = 2;
const TICK_RATE = 50;
const TICK_MS = 1000 / TICK_RATE;
const STEP_DIAGONAL = SPEED / Math.SQRT2;
const ASSET_BASE = "/neko";
const SOUND_VOLUME = 0.3;

type BaseSprite =
    | "up"
    | "upright"
    | "right"
    | "downright"
    | "down"
    | "downleft"
    | "left"
    | "upleft"
    | "scratch"
    | "wash"
    | "yawn"
    | "sleep"
    | "awake";

const SPRITE_KEYS: ReadonlyArray<string> = [
    "awake",
    "up1",
    "up2",
    "upright1",
    "upright2",
    "right1",
    "right2",
    "downright1",
    "downright2",
    "down1",
    "down2",
    "downleft1",
    "downleft2",
    "left1",
    "left2",
    "upleft1",
    "upleft2",
    "scratch1",
    "scratch2",
    "wash1",
    "wash2",
    "yawn1",
    "yawn2",
    "sleep1",
    "sleep2",
];

const SOUND_KEYS = ["awake", "idle3", "sleep"] as const;
type SoundKey = (typeof SOUND_KEYS)[number];

function toSpriteSrc(name: string) {
    return `${ASSET_BASE}/${name}.png`;
}

function toSoundSrc(name: SoundKey) {
    return `${ASSET_BASE}/${name}.wav`;
}

function normalizeAngleDegrees(angleRadians: number) {
    return ((angleRadians / Math.PI) * 180 + 360) % 360;
}

export default function CursorCat() {
    const catRef = useRef<HTMLDivElement | null>(null);
    const catImgRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
        if (!supportsFinePointer) {
            return;
        }

        for (const spriteName of SPRITE_KEYS) {
            const image = new Image();
            image.src = toSpriteSrc(spriteName);
        }

        const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const sounds = new Map<SoundKey, HTMLAudioElement>();

        for (const soundName of SOUND_KEYS) {
            const sound = new Audio(toSoundSrc(soundName));
            sound.preload = "auto";
            sound.volume = SOUND_VOLUME;
            sounds.set(soundName, sound);
        }

        const playSound = (soundName: SoundKey) => {
            const sound = sounds.get(soundName);
            if (!sound) {
                return;
            }

            sound.currentTime = 0;
            void sound.play().catch(() => {
                // Browsers can block autoplay until user interaction.
            });
        };

        const cat = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            waiting: false,
            state: 0,
            count: 0,
            min: 8,
            max: 16,
            baseSprite: "awake" as BaseSprite,
            lastSprite: "",
        };

        let clickQueued = false;
        let rafId = 0;
        let lastTime = performance.now();
        let accumulator = 0;

        const applyVisuals = () => {
            const container = catRef.current;
            const image = catImgRef.current;
            if (!container || !image) {
                return;
            }

            let frameSprite = "";
            if (cat.baseSprite === "awake") {
                frameSprite = "awake";
            } else if (cat.count < cat.min) {
                frameSprite = `${cat.baseSprite}1`;
            } else {
                frameSprite = `${cat.baseSprite}2`;
            }

            if (cat.lastSprite !== frameSprite) {
                image.src = toSpriteSrc(frameSprite);
                cat.lastSprite = frameSprite;
            }

            container.style.transform = `translate3d(${cat.x}px, ${cat.y}px, 0)`;
        };

        const stayIdle = () => {
            switch (cat.state) {
                case 0:
                case 1:
                case 2:
                case 3:
                    if (cat.state === 0) {
                        cat.state = 1;
                    }
                    cat.baseSprite = "awake";
                    break;
                case 4:
                case 5:
                case 6:
                    cat.baseSprite = "scratch";
                    break;
                case 7:
                case 8:
                case 9:
                    cat.baseSprite = "wash";
                    break;
                case 10:
                case 11:
                case 12:
                    cat.min = 32;
                    cat.max = 64;
                    cat.baseSprite = "yawn";
                    break;
                default:
                    cat.baseSprite = "sleep";
            }
        };

        const catchCursor = (dx: number, dy: number) => {
            cat.state = 0;
            cat.min = 8;
            cat.max = 16;

            const angle = normalizeAngleDegrees(Math.atan2(dy, dx));

            if (angle <= 292.5 && angle > 247.5) {
                cat.y -= SPEED;
                cat.baseSprite = "up";
            } else if (angle <= 337.5 && angle > 292.5) {
                cat.x += STEP_DIAGONAL;
                cat.y -= STEP_DIAGONAL;
                cat.baseSprite = "upright";
            } else if (angle <= 22.5 || angle > 337.5) {
                cat.x += SPEED;
                cat.baseSprite = "right";
            } else if (angle <= 67.5 && angle > 22.5) {
                cat.x += STEP_DIAGONAL;
                cat.y += STEP_DIAGONAL;
                cat.baseSprite = "downright";
            } else if (angle <= 112.5 && angle > 67.5) {
                cat.y += SPEED;
                cat.baseSprite = "down";
            } else if (angle <= 157.5 && angle > 112.5) {
                cat.x -= STEP_DIAGONAL;
                cat.y += STEP_DIAGONAL;
                cat.baseSprite = "downleft";
            } else if (angle <= 202.5 && angle > 157.5) {
                cat.x -= SPEED;
                cat.baseSprite = "left";
            } else {
                cat.x -= STEP_DIAGONAL;
                cat.y -= STEP_DIAGONAL;
                cat.baseSprite = "upleft";
            }
        };

        const tick = () => {
            cat.count += 1;

            if (cat.state === 10 && cat.count === cat.min) {
                playSound("idle3");
            }

            const maxX = Math.max(0, window.innerWidth - SPRITE_WIDTH * SCALE);
            const maxY = Math.max(0, window.innerHeight - SPRITE_HEIGHT * SCALE);
            cat.x = Math.max(0, Math.min(cat.x, maxX));
            cat.y = Math.max(0, Math.min(cat.y, maxY));

            const dx = pointer.x - (cat.x + SPRITE_WIDTH / 2);
            const dy = pointer.y - (cat.y + SPRITE_HEIGHT / 2);
            const distance = Math.abs(dx) + Math.abs(dy);

            if (distance < SPRITE_WIDTH || cat.waiting) {
                stayIdle();
                if (clickQueued) {
                    cat.waiting = !cat.waiting;
                    clickQueued = false;
                }
            } else {
                if (cat.state >= 13) {
                    playSound("awake");
                }
                catchCursor(dx, dy);
            }

            if (cat.count > cat.max) {
                cat.count = 0;
                if (cat.state > 0) {
                    cat.state += 1;
                    if (cat.state === 13) {
                        playSound("sleep");
                    }
                }
            }

            applyVisuals();
        };

        const onPointerMove = (event: PointerEvent) => {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
        };

        const onPointerDown = (event: PointerEvent) => {
            if (event.button === 0) {
                clickQueued = true;
            }
        };

        const animate = (time: number) => {
            accumulator += time - lastTime;
            lastTime = time;

            while (accumulator >= TICK_MS) {
                tick();
                accumulator -= TICK_MS;
            }

            rafId = window.requestAnimationFrame(animate);
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("pointerdown", onPointerDown, { passive: true });

        applyVisuals();
        rafId = window.requestAnimationFrame(animate);

        return () => {
            window.cancelAnimationFrame(rafId);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerdown", onPointerDown);
        };
    }, []);

    return (
        <div className="cursor-cat-layer" aria-hidden="true">
            <div className="cursor-cat" ref={catRef}>
                <img
                    ref={catImgRef}
                    className="cursor-cat-image"
                    src="/neko/awake.png"
                    alt=""
                    width={SPRITE_WIDTH * SCALE}
                    height={SPRITE_HEIGHT * SCALE}
                    draggable={false}
                />
            </div>
        </div>
    );
}
