var fibbo = function (n) {
    if (n === 0){
        return 0;
    }
    if (n === 1){
        return 1;
    }
    return fibbo(n-1) + fibbo(n-2);
}
if(require.fibonacci === module){
    var n = Number(process.argv[2]);
    console.log('fibo('+n+') is',fibbo(n));
}