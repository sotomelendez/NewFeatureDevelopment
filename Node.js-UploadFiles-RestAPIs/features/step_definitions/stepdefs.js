const fs = require('fs');
const assert = require('assert');
const { Given, When, Then } = require('cucumber');


function isThereMoreThanOnePage(num) {
    //Page size is 20 files
    return num < 20 ? "Nope" : "Yep";
}

Given('there are {int} files', function (num) {
      // Write code here that turns the phrase above into concrete actions
      this.num = num;
      return num;
    });

When('I ask whether is there more than one page', function () {
    // Write code here that turns the phrase above into concrete actions
        this.actualAnswer = isThereMoreThanOnePage(this.num);
    });

Then('I should be told {string}', function (expectedAnswer) {
        // Write code here that turns the phrase above into concrete actions
        assert.equal(this.actualAnswer, expectedAnswer);
    });

When('I look inside the uploads folder', async function () {
        // Write code here that turns the phrase above into concrete actions
        let uploadFolder = 'uploads/';
        await fs.readdir(uploadFolder, (err, files) => {
            this.num = files.length;
        });
        this.actualAnswer = isThereMoreThanOnePage(this.num);
    });