// create router and reference to models
const db = require('../models')
const router = require('express').Router()

// GET /bounties
router.get('/', (req, res)=>{
  db.Bounty.find()
  .then(foundBounties=>{
    // console.log('BOUNTIES:', bounties)
    res.json(foundBounties)
  })
  .catch(err=>{
    console.log(err)
    // 503 Service Unavailable
    res.status(503).json({message: 'Database asleep?'})
  })
  // res.send('You\'ve hit the GET /bounties route!')
})

// GET /bounties/:id
router.get('/:id', (req, res)=>{
  db.Bounty.findById(req.params.id)
  .then(foundBounty=>{
    if(foundBounty){
        res.send(foundBounty)
    } else {
        res.status(404).json({message: 'Resource not located.'})
    }
  }).catch(err=>{
    console.log(err)
    res.status(503).json({message: 'Service Unavailable'})
  })
  // res.send('You\'ve hit the GET /bounties/:id route!')
})

// POST /bounties
router.post('/', (req, res)=>{
  console.log(req.body)
  db.Bounty.create(req.body)
  .then(createdBounty=>{
    console.log(createdBounty)
    res.status(201).json(createdBounty)
  })
  .catch(err=>{
    console.log('Error while creating', err)
    if(err.name === 'ValidationError'){
      res.status(406).json({message: 'Validation Error'})
    } else {
      res.status(503).json({message:'Database or server error!'})
    }
  })
  // res.send('You\'ve hit the POST /bounties route!')
})

// PUT /bounties/:id
router.put('/:id', (req, res)=>{
  db.Bounty.findOneAndUpdate({
    _id: req.params.id
  },
  req.body,
  {
    new: true
  })
  .then(updatedBounty=>{
    res.json(updatedBounty)
  })
  .catch(err=>{
    console.log(err)
    res.status(503).json({message: 'Server Error'})
  })
  // res.send('You\'ve hit the PUT /bounties/:id route!')
})

// DELETE /bounties
router.delete('/', (req, res)=>{
  db.Bounty.deleteMany()
  .then(()=>{
    res.send({message: 'We did it?'})
  })
  .catch(err=>{
    console.log(err)
    res.status(503).send({message: 'Server Error'})
  })
  // res.send('You\'ve hit the DELETE /bounties route!')
})

// DELETE /bounties:id
router.delete('/:id', (req, res)=>{
  db.Bounty.findByIdAndDelete(req.params.id)
  .then(()=>{
    res.status(204).json({message: 'successfully deleted'})
  })
  .catch(err=>{
    console.log(err)
    res.status(503).json({message: 'Server Error'})
  })
  // res.send('You\'ve hit the DELETE /bounties/:id route!')
})


module.exports = router