const modifyPkgUp = require('modify-pkg-up')

process.chdir('../../')

modifyPkgUp((pkg) => {
    return Object.assign(pkg,{
        scripts: {
            "test": "mocha ./node_modules/butter-provider/tests/*",
            "lint": "standard --env mocha"
        }
    })
})
