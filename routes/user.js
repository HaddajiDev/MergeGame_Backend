const express = require("express");

const router = express.Router();

const User = require('../models/user');


router.post('/', async(req, res) => {
    
    const {username, score, wins} = req.body;
    try {
        const user = new User({
            username: username,
            score: score,
            totalWins: wins
        })

        const newUser = await user.save();
        res.send({msg: "user Added", id: newUser.id});
    } catch (error) {
        res.send({msg: "username taken (just like your crush)"});
        console.log(error);
    }
});

//update Score
router.put('/update/score', async (req, res) => {
    const id = req.query.id;
    const score = req.query.score;
    
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { score: score },
            { new: true }
        );

        if (user) {
            res.send({ message: "User score updated successfully", user });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error updating user score" });
    }
});

//update totalWins
router.put('/update/totalwin', async(req, res) => {
    try {
        const id = req.query.id;
        const wins = req.query.wins;

        const user = await User.findByIdAndUpdate(
            id,
            {totalWins: wins},
            {new: true}
        );
        
        if (user) {
            res.send({ message: "User total wins updated successfully", user });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error updating user total wins" });
    }
})

router.get('/playerScore', async(req, res) => {
    const id = req.query.id;
    try {
        const user = await User.findById(id);
        if(user){
            res.send({score: user.score, username: user.username});
        }
        else{
            res.status(500).send({ message: "Player not found" });
        }
        
    } catch (error) {
        
    }
});

router.get('/playerWins', async(req, res) => {
    try {
        const id = req.query.id;

        const user = await User.findById(id);
        if(user){
            res.send({wins: user.totalWins, username: user.username});
        }
        else
        {
            res.status(500).send({ message: "Player not found" });
        }
        
    } catch (error) {
        res.status(500).send({ message: "Error" });
    }
})


router.get('/topPlayers/score', async(req, res) => {
    try {
        const topUsers = await User.find().sort({score: -1}).limit(10);
        res.send({users: topUsers});
    } catch (error) {
        res.status(500).send({ message: "Error" });
    }
});

router.get('/topPlayers/wins', async(req, res) => {
    try {
        const topUsers = await User.find().sort({totalWins: -1}).limit(10);
        res.send({users: topUsers});
    } catch (error) {
        res.status(500).send({ message: "Error" });
    }
});


module.exports = router;
