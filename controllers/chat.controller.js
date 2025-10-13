const Chat = require("../models/chat.model");
const supervisorGroups = require("../models/research.topic.model");
const studentGroup = require("../models/student.groups.model");

// Get all chat data
const findAll = async (id) => {
  const chats = await Chat.find({ groupId: id });
  return chats;
};

// Find by pagination
const findByPagination = async (req, res) => {
  const _pageNumber = parseInt(req.params.page);
  const _pageSize = parseInt(req.params.pageSize);
  const client_id = 1;

  Chat.countDocuments({ client_id: client_id }, function (err, count) {
    if (err) {
      return res.json(err);
    }
    Chat.find({ client_id: client_id }, null, { sort: { createdAt: -1 } })
      .skip(_pageNumber > 0 ? (_pageNumber - 1) * _pageSize : 0)
      .limit(_pageSize)
      .exec(function (err, docs) {
        if (err) {
          return res.json(err);
        } else {
          res.json({
            Total: count,
            _Data: docs,
          });
        }
      });
  });
};

// Find by ID
const findById = async (req, res) => {
  const chat = await Chat.findById(req.params.id);
  res.send(chat);
};

// Store chat details
const store = async (data) => {
  const chat = new Chat(data);
  chat.createdAt = Date.now().toString();
  await chat.save();
  return chat;
};

// Update chat
const update = async (req, res) => {
  const id = req.params.id;
  let chat = await Chat.findById(id);
  if (chat) {
    await Chat.updateOne(
      { _id: req.params.id },
      { ...req.body, updatedAt: Date.now().toString() }
    );
    chat.save();
    res.send(chat);
  } else {
    // throw new NotFound("chat not found by the id: " + id);
    res.status(404).send({ message: "Chat not found by the id: " + id });
  }
};

// Destroy all chats
const destroyAll = async () => {
  try {
    await Chat.deleteMany({});
  } catch (e) {
    // throw new NotFound("Chat not found ", e);
    throw new Error("Chat not found ", e);
  }
};

// Destroy chat by ID
const destroy = async (req, res) => {
  let chat = await Chat.findById(req.params.id);
  if (chat) {
    let result = await Chat.deleteOne({ _id: req.params.id });
    res.send(chat);
  } else {
    res
      .status(404)
      .send({ message: "Chat not found by the id: " + req.params.id });
  }
};

const getGroupChatsByStaff = async (req, res) => {
  // reqSupervisor, co_supervisorID
  const supervisorID = req.query.supervisor;
  const co_supervisorID = req.query.co_supervisor;
  if (supervisorID != undefined && co_supervisorID == undefined) {
    supervisorGroups
      .find({ supervisorID: supervisorID })
      .then((groups) => {
        res.json({
          success: true,
          groupList: groups,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err,
        });
      });
  } else if (co_supervisorID != undefined && supervisorID == undefined) {
    supervisorGroups
      .find({ co_supervisorID: co_supervisorID })
      .then((groups) => {
        res.json({
          success: true,
          groupList: groups,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err,
        });
      });
  } else {
    return res.status(400).json({
      error: "Please enter supervisor id or co supervisor id",
    });
  }
};

const getGroupChatsByStudent = async (req, res) => {
  const id = req.query.id;
  if (id != undefined) {
    try {
      const groups = await studentGroup.find();
      const groupList = groups.filter((group) => {
        if (group.leaderID == id) {
          return true;
        }
        if (
          group.members.some(
            (member) =>
              member.member_1 == id ||
              member.member_2 == id ||
              member.member_3 == id
          )
        ) {
          return true;
        }
        return false;
      });

      res.json({
        success: true,
        groupList: groupList.length ? groupList : [],
      });
    } catch (err) {
      return res.status(400).json({
        error: err,
      });
    }
  } else {
    return res.status(400).json({
      error: "Please enter leader id or student id",
    });
  }
};

module.exports = {
  findAll,
  findByPagination,
  findById,
  store,
  update,
  destroyAll,
  destroy,
  getGroupChatsByStaff,
  getGroupChatsByStudent,
};
