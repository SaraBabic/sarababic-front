'use client';

import React, { useEffect } from 'react';

const Matrix = ({ headline }) => {
    useEffect(() => {
        class MatrixAnimation {
            constructor(element, lettersColor, letterSize, font, speed) {
                this.element = element;
                this.width = element.offsetWidth;
                this.height = element.offsetHeight;
                this.lettersColor = lettersColor;
                this.letterSize = letterSize;
                this.font = font;
                this.speed = speed < 24 ? 24 : speed;
                this.status = true;
                this.ctx = undefined;
                this.letters = undefined;
            }

            drawAnimation() {
                if (this.status) {
                    this.ctx.fillStyle = this.lettersColor;
                    this.ctx.font = `${this.letterSize}pt ${this.font}`;

                    this.letters.forEach((y, index) => {
                        const randomSymbol = String.fromCharCode(Math.random() * 128);
                        const x = index * this.letterSize;

                        this.ctx.fillText(randomSymbol, x, y);

                        if (y > this.height + Math.random() * 15000) this.letters[index] = 0;
                        else this.letters[index] = y + this.letterSize;
                    });

                    this.ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
                    this.ctx.fillRect(0, 0, this.width, this.height);
                }
            }

            createCanvas(element) {
                this.element.innerHTML = '';

                this.width = element ? element.offsetWidth : this.width;
                this.height = element ? element.offsetHeight : this.height;

                const canvas = document.createElement('canvas');
                canvas.setAttribute('id', 'canvas');
                canvas.setAttribute('width', this.width);
                canvas.setAttribute('height', this.height);

                this.ctx = canvas.getContext('2d');

                const col = Math.floor(this.width / this.letterSize);
                // Inicijalizuje visine svake kolone sa slučajnim vrednostima
                this.letters = Array.from({ length: col }, () => Math.random() * this.height);

                this.element.append(canvas);
            }

            init() {
                this.createCanvas();

                setInterval(() => {
                    this.drawAnimation();
                }, this.speed);
            }

            pausePlay() {
                this.status = !this.status;
            }
        }

        const matrix = new MatrixAnimation(document.querySelector('#matrix'), '#B10CF5', 10, 'Arial', 80);

        matrix.init();

        const handleResize = () => {
            matrix.createCanvas(document.querySelector('#matrix'));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div id="matrix" className="relative bg-black text-white text-center h-[70vh] w-full"></div>
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-white z-20 text-center">{headline}</h1>
        </div>
    );
};

export default Matrix;
