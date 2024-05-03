// TweetBox.js
import { useState } from 'react';

const TweetBox = () => {
    const [tweetText, setTweetText] = useState('');

    const handleInputChange = (event) => {
        setTweetText(event.target.value);
    };

    const postTweet = () => {
        if (tweetText.trim() !== '') {
            console.log('Tweet Posted:', tweetText);
            setTweetText('');
        } else {
            alert('Please enter caption before posting.');
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded p-4 mb-4">
            <textarea
                value={tweetText}
                onChange={handleInputChange}
                placeholder="What's happening?"
                className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:border-blue-500"
            ></textarea>
            <button
                onClick={postTweet}
                className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
            >
                Post
            </button>
        </div>
    );
};

export default TweetBox;
