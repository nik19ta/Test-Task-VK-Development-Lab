export interface AlertInterface {
    message: string,
    description: string,
    type: "error" | "warning" | "success" | "info"
}
