import React, { useRef, useEffect, useState } from "react";
import WebViewer from '@pdftron/webviewer';
import './App.css';
import formpdf from "../src/assets/form11.pdf"

const initialDoc = {
  required: "zaid",
  email: "zaid@gmail.com",
  radio: "No",
  // checkbox: [{ checkbox3: "Blue", }],
  checkbox1: "Red",
  checkbox2: "Off",
  checkbox3: "Blue",
  listbox: "March",
  dropdown: "Car",
  multiline: "This is a example text"
}

function App() {

  const viewerRef = useRef(null);
  const [fieldValues, setFieldValues] = useState(initialDoc);
  console.log('fieldValues', fieldValues)

  useEffect(() => {

    if (viewerRef.current) {
      WebViewer(
        {
          path: 'lib',
          initialDoc: formpdf,
          licenseKey: '1686973156664:7d8378590300000000253453a7e78ce37359bea3c2a3d20c58f415e0f8'
        },
        viewerRef.current,
        document.getElementById('pdf-viewer')
      ).then(instance => {
        const { documentViewer, annotationManager } = instance.Core;


        annotationManager.addEventListener('fieldChanged', (field, value) => {
          setFieldValues(prevFieldValues => ({
            ...prevFieldValues,
            [field.name]: value,
          }));
        });

        documentViewer.addEventListener('documentLoaded', () => {
          documentViewer.getAnnotationsLoadedPromise().then(() => {
            // iterate over fields
            const fieldManager = annotationManager.getFieldManager();
            fieldManager.forEachField(field => {
              const fieldName = field.name;
              console.log('fieldName', fieldName)
              if (initialDoc.hasOwnProperty(fieldName)) {
                const initialValue = initialDoc[fieldName];
                field.setValue(initialValue);
              }
            });
          });
        });
      });
    }
  }, []);

  // useEffect(() => {
  //   if (viewerRef.current) {
  //     WebViewer(
  //       {
  //         path: 'lib',
  //         initialDoc: formpdf,
  //         licenseKey: '1686973156664:7d8378590300000000253453a7e78ce37359bea3c2a3d20c58f415e0f8'
  //       },
  //       viewerRef.current,
  //       document.getElementById('pdf-viewer')
  //     ).then(instance => {
  //       const { documentViewer, annotationManager } = instance.Core;

  //       annotationManager.addEventListener('fieldChanged', (field, value) => {
  //         setFieldValues(prevFieldValues => ({
  //           ...prevFieldValues,
  //           [field.name]: value,
  //         }));
  //       });

  //       documentViewer.addEventListener('documentLoaded', () => {
  //         documentViewer.getAnnotationsLoadedPromise().then(() => {
  //           // iterate over fields
  //           const fieldManager = annotationManager.getFieldManager();
  //           fieldManager.forEachField(field => {
  //             const fieldName1 = field.name;
  //             const fieldName = field.name;
  //             if (initialDoc.hasOwnProperty(fieldName)) {
  //               let initialValue = initialDoc[fieldName];
  //               console.log('fieldName1', fieldName1)
  //               // field.setValue(initialValue);
  //               if (fieldName1 === 'checkbox') {
  //                 const checkboxValue = initialValue[0];
  //                 const checkboxFieldName = Object.keys(checkboxValue)[0];
  //                 const checkboxField = field.getField(checkboxFieldName);

  //                 console.log('checkboxField', checkboxField)
  //                 // Set the checkbox value
  //                 checkboxField.setValue(checkboxValue[checkboxFieldName]);
  //               } else {
  //                 field.setValue(initialValue);
  //               }

  //             }
  //           });
  //         });
  //       });
  //     });
  //   }
  // }, []);



  // useEffect(() => {
  //   WebViewer(
  //     {
  //       path: 'lib',
  //       initialDoc: formpdf,
  //     },
  //     document.getElementById('pdf-viewer')
  //   ).then(instance => {
  //     const { documentViewer, annotationManager } = instance.Core;

  //     documentViewer.addEventListener('documentLoaded', () => {
  //       documentViewer.getAnnotationsLoadedPromise().then(() => {
  //         const fieldManager = annotationManager.getFieldManager();
  //         const fieldId = 'fieldId'; // Replace 'fieldId' with the actual ID of the form field you want to update
  //         const field = fieldManager.getField(fieldId);
  //         console.log('field', field)
  //         if (field) {
  //           field.setValue('new value');
  //         }
  //       });
  //     });
  //   });
  // }, []);


  // useEffect(() => {
  //   WebViewer(
  //     {
  //       path: 'lib',
  //       initialDoc: formpdf,

  //     },
  //     viewerRef.current,
  //   ).then((instance) => {
  //     const { documentViewer, annotationManager, Annotations } = instance.Core;
  //     // console.log('documentViewer', documentViewer.getFormFieldValues())
  //     documentViewer.addEventListener('documentLoaded', () => {
  //       const formFields = documentViewer.getFormFieldValues();

  //       // Log the form field values to the console
  //       console.log("formFields", formFields);
  //       const rectangleAnnot = new Annotations.RectangleAnnotation({
  //         PageNumber: 1,
  //         // values are in page coordinates with (0, 0) in the top left
  //         X: 100,
  //         Y: 150,
  //         Width: 200,
  //         Height: 50,
  //         Author: annotationManager.getCurrentUser()
  //       });

  //       annotationManager.addAnnotation(rectangleAnnot);
  //       // need to draw the annotation otherwise it won't show up until the page is refreshed
  //       annotationManager.redrawAnnotation(rectangleAnnot);
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   WebViewer(
  //     {
  //       path: 'lib',
  //       initialDoc: formpdf,
  //       licenseKey: '1686973156664:7d8378590300000000253453a7e78ce37359bea3c2a3d20c58f415e0f8'
  //       licenseKey: '1686973156664:7d8378590300000000253453a7e78ce37359bea3c2a3d20c58f415e0f8'
  //     },
  //     viewerRef.current
  //   ).then(async (instance) => {
  //     const { documentViewer, annotationManager, Annotations } = instance.Core;
  //     documentViewer.addEventListener('documentLoaded', async () => {

  //       const annotationManager = documentViewer.getAnnotationManager();
  //       const exportedAnnotations = await annotationManager.exportAnnotations();
  //       const formFields = {};

  //       // Parse the exported annotations
  //       const parser = new DOMParser();
  //       const xmlDoc = parser.parseFromString(exportedAnnotations, 'application/xml');
  //       const widgetNodes = xmlDoc.getElementsByTagName('widget');
  //       console.log('widgetNodes', widgetNodes)
  //       for (let i = 0; i < widgetNodes.length; i++) {
  //         const widget = widgetNodes[i];
  //         const fieldName = widget.getAttribute('field');
  //         const fieldValue = widget.getAttribute('value');
  //         formFields[fieldName] = fieldValue;
  //       }

  //       console.log('formFields', formFields);


  //       const rectangleAnnot = new Annotations.RectangleAnnotation({
  //         PageNumber: 1,
  //         X: 100,
  //         Y: 150,
  //         Width: 200,
  //         Height: 50,
  //         Author: annotationManager.getCurrentUser(),
  //       });

  //       annotationManager.addAnnotation(rectangleAnnot);
  //       annotationManager.redrawAnnotation(rectangleAnnot);

  //       // Generate the PDF
  //       const doc = documentViewer.getDocument();
  //       const data = await doc.getFileData({
  //         xfdfString: annotationManager.exportAnnotations(),
  //       });

  //       for (const fieldName in formFields) {
  //         const fieldValue = formFields[fieldName];
  //         console.log(`${fieldName}: ${fieldValue}`);
  //       }

  //     });
  //   });
  // }, []);


  // const [formValues, setFormValues] = useState({});
  // console.log('formValues', formValues)
  // useEffect(() => {
  //   WebViewer(
  //     {
  //       path: 'lib',
  //       initialDoc: formpdf,
  //       licenseKey: '1686973156664:7d8378590300000000253453a7e78ce37359bea3c2a3d20c58f415e0f8'
  //       licenseKey: '1686973156664:7d8378590300000000253453a7e78ce37359bea3c2a3d20c58f415e0f8'
  //     },
  //     document.getElementById('viewer')
  //   ).then((instance) => {
  //     const { docViewer } = instance;

  //     docViewer.on('documentLoaded', () => {
  //       const formFields = docViewer.getFormFieldIterator();
  //       const values = {};

  //       while (formFields.hasNext()) {
  //         const field = formFields.current();
  //         const fieldValue = field.get('FieldValue');

  //         // Store the field name and value in the values object
  //         values[field.get('FieldName')] = fieldValue;

  //         formFields.next();
  //       }

  //       setFormValues(values);
  //     });
  //   });
  // }, []);
  // const [formValue, setFormValue] = useState('');


  // useEffect(() => {
  //   WebViewer(
  //     {
  //       path: 'lib',
  //       initialDoc: formpdf,
  //     },
  //     document.getElementById('pdf-viewer')
  //   ).then(instance => {
  //     const { documentViewer, annotationManager } = instance.Core;

  //     documentViewer.addEventListener('documentLoaded', () => {
  //       documentViewer.getAnnotationsLoadedPromise().then(() => {
  //         const fieldManager = annotationManager.getFieldManager();
  //         console.log('fieldManager', fieldManager)
  //         const fieldId = 'email'; // Replace 'fieldId' with the actual ID of the form field you want to update
  //         const field = fieldManager.getField(fieldId);
  //         console.log('field', field)
  //         if (field) {
  //           field.setValue('Zaid ALi');
  //         }
  //       });
  //     });
  //   });
  // }, []);






  return (
    <div className="App">

      <div ref={viewerRef} style={{ width: '100%', height: '100vh' }} />

    </div>
  );
}

export default App;
