export const colors: string[] = ["red", "green", "blue"];
export const actualDate: Date = new Date();

// export function getColor(index:number): string | undefined {
//     return colors[index];
// }
export function getColor(index: number): string {
    return colors[index] || "Color not found";
}