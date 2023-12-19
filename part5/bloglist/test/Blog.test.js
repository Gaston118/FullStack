import '@testing-library/jest-dom';
import React from 'react';
import { render , fireEvent} from '@testing-library/react';
import Blog from '../src/components/Blog';
import BlogForm from '../src/components/BlogForm';

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "Jest",
    likes: 100
  }

  const { getByText } = render(
    <Blog blog={blog} />
  )

  expect(getByText('Component testing is done with react-testing-library')).toBeInTheDocument();
})

test('shows number of likes when button is clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jest',
    likes: 100,
    user: "user"
  };

  const component = render(<Blog blog={blog} />);

  // Verifica que el número de likes no se muestra inicialmente
  expect(component.queryByText('Likes: 100')).toBeNull();

  // Encuentra el botón que controla los detalles y haz clic en él
  const button = component.getByText('View');
  fireEvent.click(button);

  // Ahora verifica que el número de likes se muestra después de hacer clic
  expect(component.getByText('Likes: 100')).toBeInTheDocument();
})

test('calls event handler twice when like button is clicked twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jest',
    likes: 100,
    user: "user"
  };
  const handleLike = jest.fn();
 
  const { getByText } = render(
    <Blog blog={blog} handleLike={handleLike} />
  );
  const viewButton = getByText('View');
  fireEvent.click(viewButton);
 
  const likeButton = getByText('like');
 
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
 
  expect(handleLike).toHaveBeenCalledTimes(2);
 })

 test('calls event handler with correct details when adding a new blog', () => {
  const addBlog = jest.fn();

  const component = render(<BlogForm addBlog={addBlog} />);

  const newBlog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    likes: '42',
  };

  const titleInput = component.getByTestId('title-input');
  const authorInput = component.getByTestId('author-input');
  const likesInput = component.getByTestId('likes-input');
  const addButton = component.getByText('add');

  fireEvent.change(titleInput, { target: { value: newBlog.title } });
  fireEvent.change(authorInput, { target: { value: newBlog.author } });
  fireEvent.change(likesInput, { target: { value: newBlog.likes } });

  fireEvent.submit(component.getByTestId('new-blog-form'));

  // Verifica que el controlador de eventos fue llamado con los detalles correctos
  expect(addBlog).toHaveBeenCalledTimes(1);
  expect(addBlog).toHaveBeenCalledWith(
    expect.objectContaining({
      preventDefault: expect.any(Function),
      target: expect.any(Object),
    })
  );
});
