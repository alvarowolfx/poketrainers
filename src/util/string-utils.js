
export function padLeft(num, n, str){
    return Array(n-String(num).length+1).join(str||'0')+num;
}
