const { spawn } = require('child_process');

process.env.NODE_ENV = 'development';

const webpack = spawn('webpack', ['serve'], { stdio: 'inherit', shell: true });

webpack.on('close', (code) => {
    process.exit(code);
});
