import poppyImage from '../../assets/images/poppyImage.png';
import whiteRoseImage from '../../assets/images/whiteRoseImage.png';
import daisyImage from '../../assets/images/daisyImage.png';
import redLilyImage from '../../assets/images/redLilyImage.png';
import sunflowerImage from '../../assets/images/sunflowerImage.png';
import hydrangea from '../../assets/images/hydrangea.jpg';
import periwinkle from '../../assets/images/periwinkleImage.png';

const productData = [
  {
    id: 1,
    name: 'Poppy',
    image: poppyImage,
    description: 'A stunning blue poppy.',
    price: 400,
    dateAdded: '2023-10-01',  // Add date for filtering by newest/oldest
  },
  {
    id: 2,
    name: 'White Rose',
    image: whiteRoseImage,
    description: 'A delicate white rose.',
    price: 300,
    dateAdded: '2023-09-15',
  },
  {
    id: 3,
    name: 'Daisy',
    image: daisyImage,
    description: 'A charming daisy flower.',
    price: 250,
    dateAdded: '2023-09-10',
  },
  {
    id: 4,
    name: 'Red Lily',
    image: redLilyImage,
    description: 'A vibrant red lily.',
    price: 350,
    dateAdded: '2023-08-25',
  },
  {
    id: 5,
    name: 'Sunflower',
    image: sunflowerImage,
    description: 'A bright sunflower.',
    price: 500,
    dateAdded: '2023-09-20',
  },
  {
    id: 6,
    name: 'Periwinkle',
    image: periwinkle,
    description: 'A lovely purple orchid.',
    price: 450,
    dateAdded: '2023-10-05',
  },
  {
    id: 7,
    name: 'Hydrangea',
    image: hydrangea,
    description: 'A soothing blue flower.',
    price: 600,
    dateAdded: '2023-10-10',
  },
];

export default productData;
