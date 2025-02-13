interface SessionState {
    isAuthenticated: boolean;
    user: {
        name: string;
        email: string;
    } | null;
}
export declare const login: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    name: string;
    email: string;
}, "session/login">, logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"session/logout">;
declare const _default: import("redux").Reducer<SessionState>;
export default _default;
