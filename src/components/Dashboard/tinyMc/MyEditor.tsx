import { Editor } from "@tinymce/tinymce-react";
import { Field, FieldProps } from "formik";
import { useMemo } from "react";

interface TinyMCEEditorProps {
  name: string;
  placeholder?: string;
}

const TinyMCEEditor = ({ name, placeholder }:TinyMCEEditorProps) => {
  const config = useMemo(
    () => ({
        height: 400,
        menubar: true,
        placeholder: placeholder || "Start typing...",
        file_picker_types: "file image media",
        automatic_uploads: true,
        image_advtab: true,
        image_dimensions: true,
        image_caption: true,
        image_title: true,
        autosave_interval: "10s",
        a11y_advanced_options: true,
        quickbars_insert_toolbar: true,
        nonbreaking_force_tab: true,
        allow_html_in_named_anchor: true,
        quickbars_image_toolbar:
        "alignleft aligncenter alignright | rotateleft rotateright | imageoptions",
      plugins: [
        "advlist",
        "autolink",
        "accordion",
        "quickbars",
        "autosave",
        "importword",
        "link",
        "image",
        "lists",
        "charmap",
        "preview",
        "anchor",
        "pagebreak",
        "searchreplace",
        "wordcount",
        "visualblocks",
        "insertimage",
        "visualchars",
        "code",
        "fullscreen",
        "insertdatetime",
        "quickbars",
        "editimage",
        "media",
        "table",
        "emoticons",
        "help",
        "directionality",
        "nonbreaking",
      ],
      toolbar1:
        "undo redo | blocks | fontsize | styles | nonbreaking | bold italic | accordion | ltr rtl | quickimage | quicktable | importword",
      toolbar2:
        "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullscreen | forecolor backcolor emoticons | anchor | restoredraft | help",
      menu: {
        file: {
          title: "File",
          items:
            "newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations",
        },
        edit: {
          title: "Edit",
          items:
            "undo redo | cut copy paste pastetext | selectall | searchreplace",
        },
        view: {
          title: "View",
          items:
            "code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments",
        },
        insert: {
          title: "Insert",
          items:
            "image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
        },
        format: {
          title: "Format",
          items:
            "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat",
        },
        tools: {
          title: "Tools",
          items: "spellchecker spellcheckerlanguage | a11ycheck code wordcount",
        },
        table: {
          title: "Table",
          items:
            "inserttable | cell row column | advtablesort | tableprops deletetable",
        },
        help: { title: "Help", items: "help" },
      },
      contextmenu: [
        "cut copy paste | link image inserttable | image | tableprops deletetable | cell row column",
        "bold italic underline | removeformat | forecolor backcolor",
        "insertdatetime emoticons | code",
      ],
    }),
    [placeholder]
  );

  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => (
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINY_API}
          value={field.value}
          onEditorChange={(content) => form.setFieldValue(name, content)}
          init={config}
        />
      )}
    </Field>
  );
};

export default TinyMCEEditor;
