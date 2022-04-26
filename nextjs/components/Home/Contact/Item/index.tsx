type ItemType = {
  image: string;
  title: string;
  text: string;
};

const Item = ({ image, title, text }: ItemType) => {
  return (
    <li>
      <img src={image} alt={title} />
      <p className="title">{title}</p>
      <p>{text}</p>
    </li>
  );
};

export default Item;
