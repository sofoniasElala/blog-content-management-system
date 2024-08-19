import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor({editorRef}) {
 /* const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  }; */
  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_KEY}
        onInit={(evt, editor) => editorRef.current = editor}
        init={{
          height: 500,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'fullscreen',
            'insertdatetime', 'media', 'help', 'wordcount'
          ],
          toolbar: 'preview | undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </>
  );
}

RichTextEditor.propTypes = {
    editorRef: PropTypes.object,
}