const handleSignIn = (req, res, db, bcrypt) => {

    if(!req.body.email || !req.body.password){
        return res.status(400).json('Invalid Form Submission');
    }

    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        const valid = bcrypt.compareSync(req.body.password, data[0].hash)
        if(valid){
            db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then (user => {
                res.json(user[0])
            }).catch(err => res.status(400).json('User not found'))
        }else{
            res.status(400).json('Wrong credentials')
        }
    }).catch(err => res.status(400).json('Wrong credentials'))
}

module.exports = {
    handleSignIn: handleSignIn
};