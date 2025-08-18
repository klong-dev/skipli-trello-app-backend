const Invite = require('../models/invite.model')

module.exports.sendInvite = async (board_owner_id, member_id, card_id) => {
    return await Invite.create({
        card_id,
        board_owner_id,
        member_id,
    })
}

module.exports.acceptInvite = async (invite_id) => {
    return await Invite.update({status: 'accepted'}, {where: {invite_id, status: 'pending'}})
}

module.exports.declineInvite = async (invite_id) => {
    return await Invite.update({status: 'declined'}, {where: {invite_id, status: 'pending'}})
}