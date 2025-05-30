const formatTime = (time) => {
    return new Date(time).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric', // Fixed typo here
        hour12: true
    });
}

export default formatTime;

