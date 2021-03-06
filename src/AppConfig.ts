export interface IAppConfig {
    secret: string;
    id: number;
    cert: string;
    port: number;
    checkName: string;
}
export const getAppConfig = (): IAppConfig => {
    if (!process.env.APP_ID) {
        throw new Error("APP_ID not set");
    }
    if (!process.env.WEBHOOK_SECRET) {
        throw new Error("WEBHOOK_SECRET not set");
    }
    if (!process.env.PRIVATE_KEY_ENCODED) {
        throw new Error("PRIVATE_KEY_ENCODED not set");
    }
    const id = parseInt(process.env.APP_ID, 10);
    return {
        id,
        port: 3000,
        secret: process.env.WEBHOOK_SECRET,
        cert: Buffer.from(process.env.PRIVATE_KEY_ENCODED, "base64").toString("ascii"),
        checkName: process.env.CHECK_NAME ? process.env.CHECK_NAME : "pull_request_label"
    };
};
