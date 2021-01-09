const { spawn } = require('child_process');

process.env.NODE_ENV = 'production';

const webpack = spawn('webpack', [], { stdio: 'inherit', shell: true });

webpack.on('close', (code) => {
    process.exit(code);
});
