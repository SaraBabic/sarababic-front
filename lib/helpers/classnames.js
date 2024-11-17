import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export function cn(...args) {
    return twMerge(classNames(args));
}
