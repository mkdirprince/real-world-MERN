const profilesRouter = require('express').Router()
const { response } = require('../app')
const Profile = require('../models/profile')


// End point to get a profile
profilesRouter.get('/:username', async (request, response) => {

  const {username} = request.params

  const profile = await Profile.findOne({username})

  response.json(profile)

})


// End point to follow a profile
profilesRouter.post('/:username/follow', async (request, response) => {

  const {username} = request.params

  const profileToFollow = await Profile.findOne({username})

  if (!profileToFollow) {
    return response.status(404).json({ error: 'Profile not found' });
  }

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  const userProfile = await Profile.findById(user.profile)

  if (userProfile.following.includes(profileToFollow.id)) {
    response.status(400).send({error: 'Already following'})
  }

  userProfile.following = userProfile.following.concat(profileToFollow.id)

  await userProfile.save()

  const profile = {
    username: userProfile.username,
    bio: userProfile.username,
    image: userProfile.image,
    following: userProfile.following.includes(profileToFollow)
  }

  response.json(profile)


})


// Endpoint to unfollow a profile
profilesRouter.delete('/:username/unfollow', async (request, response) => {

  const {username} = request.params

  const profileToUnfollow = await Profile.findOne({username})

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  const userProfile = await Profile.findById(user.profile)


  userProfile.following = userProfile.following.filter(followerId => followerId.toString() !== profileToUnfollow.id.toString())


  await userProfile.save()

  const profile = {
    username: userProfile.username,
    bio: userProfile.username,
    image: userProfile.image,
    following: userProfile.following.includes(profileToUnfollow)
  }

  response.json(profile)

})

