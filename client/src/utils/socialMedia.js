// Sharing on social platform

export const facebookClick = url => {
  window.open(`https:www.facebook.com/sharer/sharer.php?u=${url}`);
};

export const twitterClick = url => {
  window.open(`https://twitter.com/intent/tweet?text=${url}`);
};

export const whatsappClick = url => {
  window.open(`https://wa.me/?text=${url}`);
};

export const mailClick = url => {
  window.open(`mailto:?subject="Haapa Book" &body=${url}`);
};
