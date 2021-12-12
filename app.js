import colors from 'colors';
import shell from 'shelljs';
import ora from 'ora';

const spinner = ora('Adding Asstets');
// spinner.spinner = 'aesthetic';
spinner.spinner = 'dots';


let counter = 0;
let startTime = Date.now();
let totalEndTime;

let numOfFiles = +process.argv[2] || 1;
let numOfAddsPerFile = +process.argv[3]|| 100;

console.log(colors.blue(`Starting to add ${numOfFiles*numOfAddsPerFile} assets in ${numOfFiles} files - ${numOfAddsPerFile} asset each file`));
spinner.start();

for (let i = 0; i < numOfFiles; i++)
{
    // check the users directory contents
    shell.exec(`./fabcar-addAsset-batch.sh ${(i * numOfAddsPerFile) + 1} ${numOfAddsPerFile}`, 
    {async: true, silent: true}, (code, stdout, stderr) =>
    {
        // if NO error
        if (code === 0) 
        {
            let fileEndTime = Date.now();
            // console.log(colors.grey(`File ${i+1} successfully done - ${(fileEndTime - startTime) / 1000} seconds`));
            
            spinner.succeed(colors.grey(`File ${i+1} successfully done - ${(fileEndTime - startTime) / 1000} seconds`));
            spinner.start();
    
            counter++;
    
            if (counter === numOfFiles) {
                totalEndTime = (Date.now() - startTime) / 1000;
                // console.log(colors.green(`All ${numOfFiles*numOfAddsPerFile} assets added successfully.`));
                spinner.succeed(colors.green(`All ${numOfFiles*numOfAddsPerFile} assets added successfully.`));
                console.log(colors.yellow(`~ ${totalEndTime} Seconds`));
                console.log(colors.blue(`TPS: ${( (numOfFiles * numOfAddsPerFile) / (totalEndTime) ).toFixed(2)}`));
            }
        }
        
        // any error in running 'ls' command
        else 
        {
            let lsError = stderr;
        
            console.log(colors.bgRed(`Error in iterate number: ${i+1}`));
            console.log(colors.red(lsError));
        }
    });
}
