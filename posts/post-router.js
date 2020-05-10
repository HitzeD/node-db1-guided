const express = require('express');

// database access using knex
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {

    try {

       const posts = await db.select('*').from('posts');

       res.json(posts);

    } catch (err) {

        next(err);
    }

});

router.get('/:id', async (req, res) => {

    try {

        const post = await db('posts').where('id', req.params.id).first();

        res.json(post);

    } catch(err) {

        next(err);

    }
});

router.post('/', async (req, res) => {

    try {

        const payload = {
            title: req.body.title,
            contents: req.body.contents,
        };

        const [id] = await db('posts').insert(payload);

        const post = await db('posts').where('id', id).first();

        res.json(post);

    }catch (err) {

        next(err);

    }
});

router.put('/:id', async (req, res) => {

    try {

        const payload = {
            title: req.body.title,
            contents: req.body.contents
        }

        await db('posts').where('id', req.params.id).update(payload);
        const post = await db('posts').where('id', req.params.id).first();

        res.json(post);

    }catch (err) {

        next(err)

    }
});

router.delete('/:id', async (req, res) => {

    try {

        await db('posts').where('id', req.params.id).del();
        res.status(204).end();

    }catch (err) {

        next(err)
        
    }
});

module.exports = router;