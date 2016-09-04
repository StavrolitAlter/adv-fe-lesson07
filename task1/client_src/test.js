console.log('Attempt to update 466 likes');
fetch('/json-server/posts/466/', {
	method: 'PATCH',
	headers: {
		'Content-Type' : 'application/json'
	},
	body: JSON.stringify({
		likeCount: 3
	})
}).then(function() {
	console.log('Success: 466 likes were updated');
}).then(function() {
	console.log('Attempt to calculate all likes amount');
	return fetch('/json-server/posts');
}).then(function(response) {
	return response.json();
}).then(function(postsArray) {
	var likesAmount = 0;
	postsArray.forEach(function(post) {
		likesAmount += post.likeCount;
	});
	console.log('Success: all likes amount - ' + likesAmount);
}).then(function() {
	console.log('Attempt to get comments to 466 post');
	return fetch('/json-server/posts/466/');
}).then(function(response) {
	return response.json();
}).then(function(post) {
	return getCommentsForPost(post);
}).then(function(result) {
	console.log('Success: comments to 466 post were received');
	console.log(result.join('; '));
}).catch(function(error) {
	console.log('Something went wrong: ', error);
});

function getCommentsForPost(post) {

	var comments = post.comments;
	var usersPromises = [];

	// Getting commenting users data
	if (comments && comments.length) {
		comments.forEach(function(commentData) {
			var userId = commentData.user;
			if (typeof userId !== 'undefined') {
				usersPromises.push(fetch('/json-server/users/' + userId));
			}
		});
	}

	return new Promise(function(resolve, reject) {

		Promise.all(usersPromises)
			.then(function(promicesArray) {
				return 	Promise.all(promicesArray.map(function(response) {
					return response.json();
				}));
			}).then(function(objArray) {

				var userCommentsArray = [];
				var usersObj = {};

				// Creating temp object for quick access to users data
				objArray.forEach(function(userObj) {
					var userId = userObj.id;
					if (typeof userId !== 'undefined') {
						usersObj[userId] = userObj;
					}
				});

				// In case users with listed IDs exist
				if (Object.keys(usersObj).length) {

					// Updating comments array with user names instead IDs
					comments = comments.map(function(commentData) {
						var userId = commentData.user;
						var userData = usersObj[userId];
						if (userData) {
							commentData.user = userData.name;
							userCommentsArray.push(
								commentData.user + ': ' + commentData.text
							);
						}
						return commentData;
					});

					// Updating DB by new comments array
					console.log('Attempt to get update comments to 466 post');
					fetch('/json-server/posts/466/', {
						method: 'PATCH',
						headers: {
							'Content-Type' : 'application/json'
						},
						body: JSON.stringify({
							comments: comments
						})
					}).then(function() {
						console.log('Success: comments to 466 post were updated');
					});

					// Resolving returning promise by required array
					resolve(userCommentsArray);

				} else {
					reject('No comments found for this post');
				}
			});

	});

}