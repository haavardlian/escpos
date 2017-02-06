var exec = require('child_process').exec;

exec('git rev-parse --abbrev-ref HEAD', function (error, branch) {
    if (branch == "master") process.exit(0); 
    else process.exit(1);
});