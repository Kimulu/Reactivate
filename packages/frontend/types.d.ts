import { SandpackMessage } from "@codesandbox/sandpack-client";

declare module "@codesandbox/sandpack-client" {
  export interface SandpackMessage {
    type:
      | SandpackMessage["type"]
      | "tests:passed"
      | "file:dirty"
      | "file:clean";
  }
}
