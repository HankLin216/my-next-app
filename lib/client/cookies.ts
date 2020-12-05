import * as jsCookies from "js-cookie";

export function clearTheCookies(): void {
    const account = jsCookies.get("Account");
    jsCookies.remove("Account");
    if (account !== undefined) {
        jsCookies.remove(account);
    }
}
