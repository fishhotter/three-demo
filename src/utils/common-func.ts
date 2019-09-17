import * as crypto from "crypto";

declare function escape(s: string): string;
declare function unescape(s: string): string;

const CommonFunc = {

    compare(propertyName: string) {
        return (obj1: object, obj2: object): number => {
            const value1 = obj1[propertyName];
            const value2 = obj2[propertyName];
            if (value1 < value2) {
                return 1;
            } else if (value1 > value2) {
                return -1;
            }
            return 0;
        };
    },

    getMd5(data: string): string {
        const md5 = crypto.createHash("md5");
        md5.update(data);
        return md5.digest("hex");
    },

    // tslint:disable-next-line:no-magic-numbers
    setCookie(key: string, value: any, expireTime = 24 * 60 * 60 * 1000): void {
        const expire = new Date();
        expire.setTime(expire.getTime() + expireTime);
        document.cookie = `${key}=${escape(value)};expires=${expire.toUTCString()};path=/;`;
    },

    getCookie(key: string): string | undefined {
        const reg = new RegExp(`(^|)*${key}=([^;]*)(;|$)`);
        const result = document.cookie.match(reg);
        return result ? unescape(result[2]) : undefined
    },

    removeCookie(key: string): void {
        const expire = new Date();
        // tslint:disable-next-line:no-magic-numbers
        expire.setTime(expire.getTime() - 24 * 60 * 60 * 1000);
        const result = this.getCookie(key);
        if (result) {
            document.cookie = `${key}=${escape(result)};expires=${expire.toUTCString()};path=/`;
        }
    },

    gradientColor(startColor: string, endColor: string, step: number): string[] {
        const startRGB: string | number[] = this.colorRgb(startColor);// 转换为rgb数组模式
        const startR: string | number = +startRGB[0];
        const startG: string | number = +startRGB[1];
        const startB: string | number = +startRGB[2];

        const endRGB: string | number[] = this.colorRgb(endColor);
        const endR: string | number = +endRGB[0];
        const endG: string | number = +endRGB[1];
        const endB: string | number = +endRGB[2];

        const sR: number = (endR - startR) / step;// 总差值
        const sG: number = (endG - startG) / step;
        const sB: number = (endB - startB) / step;

        const colorArr: string[] = [];
        for (let i = 0; i < step; i++) {
            // 计算每一步的hex值
            const hex: string = this.colorHex(`rgb(${parseInt("" + sR * i + startR)},${parseInt("" + sG * i + startG)},${parseInt("" + sB * i + startB)})`);
            colorArr.push(hex);
        }
        return colorArr;
    },

    // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
    colorRgb(sColor: string): string | number[] {
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        const colorLen = 4;
        const hexColorLen = 7
        let sColorTemp = sColor.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === colorLen) {
                let sColorNew = "#";
                for (let i = 1; i < colorLen; i++) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColorTemp = sColorNew;
            }
            // 处理六位的颜色值
            const sColorChange = [];
            for (let i = 1; i < hexColorLen; i += 2) {
                sColorChange.push(parseInt(`0x${sColor.slice(i, i + 2)}`));
            }
            return sColorChange;
        }
        return sColorTemp;
    },

    colorHex(rgb: string): string {
        const rgbbak = rgb;
        const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (/^(rgb|RGB)/.test(rgbbak)) {
            const aColor = rgbbak.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
            let strHex = "#";
            for (let i = 0; i < aColor.length; i++) {
                let hex = Number(aColor[i]).toString(16);
                hex = +hex < 10 ? `${0}${hex}` : hex;// 保证每个rgb的值为2位
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = rgbbak;
            }
            return strHex;
        } else if (reg.test(rgbbak)) {
            const aNum = rgbbak.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return rgbbak;
            } else if (aNum.length === 3) {
                let numHex = "#";
                for (let i = 0; i < aNum.length; i++) {
                    numHex += aNum[i] + aNum[i];
                }
                return numHex;
            }
        }

        return rgbbak;
    },

    accDiv(arg1: number, arg2: number): number {
        let t1 = 0;
        let t2 = 0;
        if (`${arg1}`.indexOf(".") > -1) { t1 = `${arg1}`.split(".")[1].length; }
        if (`${arg2}`.indexOf(".") > -1) { (t2 = `${arg2}`.split(".")[1].length) };
        const r1 = Number(`${arg1}`.replace(".", ""));
        const r2 = Number(`${arg2}`.replace(".", ""));
        return r1 / r2 * Math.pow(10, t2 - t1);
    },

    // 32位唯一码
    uuid(): string {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,  (c) => {
            // tslint:disable-next-line:one-variable-per-declaration no-bitwise
            const r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
}

export default CommonFunc;