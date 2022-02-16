// use shell command to save env variable to a temporary file, then return the contents.
// source: https://stackoverflow.com/questions/39444467/how-to-pass-environment-variable-to-mongo-script/60192758#60192758
function getEnvVariable(envVar, defaultValue) {
    const command = run("sh", "-c", `printenv --null ${ envVar } >/tmp/${ envVar }.txt`);
    // note: 'printenv --null' prevents adding line break to value
    if (command !== 0)
        return defaultValue;
    else
        return cat(`/tmp/${ envVar }.txt`)
}// create application user and collection
const dbUser = getEnvVariable('APP_USER', 'app_user');
const dbPwd = getEnvVariable('APP_PWD', 'app_user()');
const dbName = getEnvVariable('DB_NAME', 'MeanUrls');
const db = db.getSiblingDB(dbName);
db.createUser({
    'user': dbUser,
    'pwd': dbPwd,
    'roles': [
        {
            'role': 'dbOwner',
            'db': dbName
        }
    ]
})