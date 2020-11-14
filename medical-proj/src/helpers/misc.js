export function RandNum(prefix) {
    return prefix + String(Math.random()).substr(2, 8);
}

export function dataOrDefault(f) {
    try {
       return f()
    }
    catch(e) {
        return ""
    }
}
