const jwt = require('jsonwebtoken');

function createToken(user) {
    let token = jwt.sign(
        {
          userId: user._id.toString(),
          organisation: "Appzia-Technology",
        },
        "MLM-APPLICATION"
      );
      return token
}

module.exports = createToken;
