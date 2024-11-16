// SPDX-License-Identifier: MIT

pragma solidity >=0.8.11;

contract ProfileContract {
    address public Owner;
    string[] public users;
    uint256 public userCount;
    uint256 public postCount;

    mapping(string => UserProfile) public profiles;
    mapping(address => string) private userAddressToUsername;
    mapping(string => address) private usernameToAddress;
    mapping(uint256 => UserPost) public allPostsByNumber;

    struct UserProfile {
        uint256 userNumber;
        string username;
        string name;
        string bio;
        string imageCID;
        string bannerCID;
        uint256 timeCreated;
        address userAddress;
        string[] followers;
        string[] following;
    }

    struct UserPost {
        uint256 postNumber;
        string content;
        string creatorUsername;
        uint256 timeCreated;
        string IPFSImagesRef;
        bool visibility;
        string category;
    }

    constructor() {
        Owner = msg.sender;
        userCount = 0;
        postCount = 0;
    }

    event NewUser(address indexed userAddress, string username, uint256 uuid);
    event Follow(address indexed follower, address indexed following);
    event Unfollow(address indexed follower, address indexed unfollowing);
    event NewUserPost(
        address indexed creatorAddress,
        uint256 indexed postCount,
        bytes32 indexed id
    );

    //Create and Update User Info Functions

    function createUser(
        string memory _username,
        string memory _name,
        string memory _bio,
        string memory _imageCID,
        string memory _bannerCID
    ) external {
        require(
            usernameToAddress[_username] == address(0),
            "Username already exists"
        );
        require(
            profiles[_username].userAddress == address(0),
            "User already exists with this address"
        );

        userCount++;
        profiles[_username] = UserProfile({
            userNumber: userCount,
            username: _username,
            name: _name,
            bio: _bio,
            imageCID: _imageCID,
            bannerCID: _bannerCID,
            userAddress: msg.sender,
            timeCreated: block.timestamp,
            followers: new string[](0x0),
            following: new string[](0x0)
        });
        usernameToAddress[_username] = msg.sender;
        userAddressToUsername[msg.sender] = _username;
        users.push(_username);

        emit NewUser(msg.sender, _username, userCount);
    }

    // Function to edit a user profile (name, bio, imageCID, bannerCID)
    function editUserProfile(
        string memory _username,
        string memory _name,
        string memory _bio,
        string memory _imageCID,
        string memory _bannerCID
    ) external {
        string memory currentUsername = userAddressToUsername[msg.sender];
        require(
            bytes(currentUsername).length != 0,
            "You must create a profile first"
        );
        require(
            keccak256(bytes(currentUsername)) == keccak256(bytes(_username)),
            "You can only edit your own profile"
        );

        UserProfile storage userProfile = profiles[_username];

        userProfile.name = _name;
        userProfile.bio = _bio;
        userProfile.imageCID = _imageCID;
        userProfile.bannerCID = _bannerCID;
    }

    //Create and Update User followers and followings Functions

    function follow(string memory _userToFollow) external {
        string memory followerUsername = userAddressToUsername[msg.sender];

        require(
            bytes(followerUsername).length != 0,
            "You must create a profile first"
        );
        require(
            bytes(_userToFollow).length != 0,
            "Username to follow cannot be empty"
        );

        address followAddress = usernameToAddress[_userToFollow];
        require(followAddress != address(0), "User to follow does not exist");

        require(
            !isFollowing(followerUsername, _userToFollow),
            "Already following this user"
        );

        profiles[followerUsername].following.push(_userToFollow);
        profiles[_userToFollow].followers.push(followerUsername);

        emit Follow(msg.sender, followAddress);
    }

    function unfollow(string memory _userToUnfollow) external {
        string memory unfollowerUsername = userAddressToUsername[msg.sender];

        require(
            bytes(unfollowerUsername).length != 0,
            "You must create a profile first"
        );
        require(
            bytes(_userToUnfollow).length != 0,
            "Username to unfollow cannot be empty"
        );

        address unfollowAddress = usernameToAddress[_userToUnfollow];
        require(
            unfollowAddress != address(0),
            "User to unfollow does not exist"
        );

        // Ensure the sender is following the user they want to unfollow
        uint256 followingIndex = findIndex(
            profiles[unfollowerUsername].following,
            _userToUnfollow
        );
        require(
            followingIndex != type(uint256).max,
            "You are not following this user"
        );

        // Remove _userToUnfollow from sender's following list
        removeIndex(profiles[unfollowerUsername].following, followingIndex);

        // Ensure the sender is a follower of the user they want to unfollow
        uint256 followerIndex = findIndex(
            profiles[_userToUnfollow].followers,
            unfollowerUsername
        );
        require(
            followerIndex != type(uint256).max,
            "You are not a follower of this user"
        );

        // Remove sender from _userToUnfollow's followers list
        removeIndex(profiles[_userToUnfollow].followers, followerIndex);

        emit Unfollow(msg.sender, unfollowAddress);
    }

    // Helper function to check if a user is following another user by username
    function isFollowing(
        string memory followerUsername,
        string memory followingUsername
    ) internal view returns (bool) {
        string[] storage followingList = profiles[followerUsername].following;
        for (uint256 i = 0; i < followingList.length; i++) {
            if (
                keccak256(bytes(followingList[i])) ==
                keccak256(bytes(followingUsername))
            ) {
                return true;
            }
        }
        return false;
    }

    // Helper function to find the index of a username in an array of strings
    function findIndex(string[] storage array, string memory value)
        internal
        view
        returns (uint256)
    {
        for (uint256 i = 0; i < array.length; i++) {
            if (keccak256(bytes(array[i])) == keccak256(bytes(value))) {
                return i;
            }
        }
        return type(uint256).max;
    }

    // Helper function to remove an element from an array of strings by index
    function removeIndex(string[] storage array, uint256 index) internal {
        array[index] = array[array.length - 1];
        array.pop();
    }

    // Function to create a new post
    function createPost(
        string memory _content,
        string memory _IPFSImagesRef,
        bool _visibility,
        string memory _category
    ) external {
        string memory creatorUsername = userAddressToUsername[msg.sender];
        require(
            bytes(creatorUsername).length != 0,
            "You must create a profile first"
        );

        postCount++;
        allPostsByNumber[postCount] = UserPost({
            postNumber: postCount,
            content: _content,
            creatorUsername: creatorUsername,
            timeCreated: block.timestamp,
            IPFSImagesRef: _IPFSImagesRef,
            visibility: _visibility,
            category: _category
        });

        emit NewUserPost(msg.sender, postCount, keccak256(bytes(_content)));
    }

    // Function to get all posts
    function getAllPosts() external view returns (UserPost[] memory) {
        UserPost[] memory posts = new UserPost[](postCount);
        for (uint256 i = 1; i <= postCount; i++) {
            posts[i - 1] = allPostsByNumber[i];
        }
        return posts;
    }

    //Return User Info Functions

    // Function to check if an account exists by user address
    function doesAccountExist(address _userAddress)
        external
        view
        returns (bool)
    {
        return bytes(userAddressToUsername[_userAddress]).length != 0;
    }

    // Function to get all user accounts (name, username, address, bio, imageCID)
    function getAllUserAccounts() external view returns (UserProfile[] memory) {
        UserProfile[] memory allUsers = new UserProfile[](userCount);
        for (uint256 i = 0; i < userCount; i++) {
            string memory username = users[i];
            UserProfile storage user = profiles[username];
            allUsers[i] = UserProfile({
                userNumber: user.userNumber,
                username: user.username,
                name: user.name,
                bio: user.bio,
                imageCID: user.imageCID,
                bannerCID: user.bannerCID,
                timeCreated: user.timeCreated,
                userAddress: user.userAddress,
                followers: new string[](0x0),
                following: new string[](0x0)
            });
        }
        return allUsers;
    }

    // Function to get a complete user profile by username
    function getUserProfileByUsername(string memory _username)
        external
        view
        returns (UserProfile memory)
    {
        require(bytes(_username).length != 0, "Username cannot be empty");
        require(
            profiles[_username].userAddress != address(0),
            "User does not exist"
        );

        return profiles[_username];
    }

    // Function to get a complete user profile by user address
    function getUserProfileByAddress(address _userAddress)
        external
        view
        returns (UserProfile memory)
    {
        string memory username = userAddressToUsername[_userAddress];
        require(bytes(username).length != 0, "User does not exist");

        return profiles[username];
    }

    //get username by address
    function getUsernameByAddress(address _userAddress)
        external
        view
        returns (string memory)
    {
        require(
            _userAddress != address(0),
            "Invalid address"
        );
        string memory username = userAddressToUsername[_userAddress];
        require(
            bytes(username).length != 0,
            "User does not exist"
        );
        return username;
    }
}
