exports.adminIsActivate={
ACTIVATE:1,
NOT_ACTIVATE:0
};

exports.houseRentOrSale={
    RENT:0,
    SALE:1
}


exports.userInRoomStatus={
    IN_ROOM:1,
    NOT_IN_ROOM:0
};


exports.userAccountStatus={
    ACTIVATE:1,
    NOT_ACTIVATE:0
}

exports.userAccountPermission={
    "-1":"GUEST",
    "0":"MEMBER",
    "1":"CO_ADMIN",
    "2":"ROOT_ADMIN"
}

exports.userAccountPermissionValueByName={
    GUEST:-1,
    MEMBER:0,
    CO_ADMIN:1
}

exports.userAccountPermissionPending={
    REJECT:-1,
    PENDING:0,
    APPROVE:1
}

exports.accountPermissionStatus={
    REJECT:-1,
    PENDING:0,
    APPROVE:1
}

exports.roomStatus={
    HIDDEN:-1,
    PENDING:0,
    SHOW:1,
}