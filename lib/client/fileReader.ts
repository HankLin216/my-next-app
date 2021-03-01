import { resolve } from "path";

export function readAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = function () {
            if (typeof reader.result === "string") {
                resolve(reader.result as string);
            } else {
                resolve("");
            }
        };
        reader.readAsDataURL(file);
    });
}
