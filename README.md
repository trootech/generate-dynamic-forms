# Create your own Dynamic form

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Demo 

[https://generate-dynamic-forms.web.app](https://generate-dynamic-forms.web.app/)

## Dynamic form generate API application

API application is developed using Node JS and MongoDB. You can find more information [here](https://github.com/trootech/generate-dynamic-forms-api)

Sample form API response if you don't want to use any backend application then you can use this JSON response directly.

```json
{
  "data": {
    "_id": "632b00838b881013251e2a75",
    "form_name": "Profile",
    "form_key": "CS95yfkk7JP0PRCC",
    "status": true,
    "submitButtonName": "Submit",
    "fields_id": [
      {
        "_id": "632b00838b881013251e2a70",
        "field_label": "First Name",
        "field_name": "first_name",
        "field_type": "text",
        "iseditable": true,
        "isvisibletolist": false,
        "is_visible_in_entery": true,
        "field_values": [],
        "validation": {
          "required": true
        },
      },
      {
        "_id": "632b00838b881013251e2a71",
        "field_label": "Last Name",
        "field_name": "last_name",
        "field_type": "text",
        "iseditable": true,
        "isvisibletolist": false,
        "is_visible_in_entery": true,
        "field_values": [],
        "validation": {
          "required": true
        },
      },
      {
        "_id": "632b00838b881013251e2a72",
        "field_label": "Email",
        "field_name": "email",
        "field_type": "email",
        "iseditable": true,
        "isvisibletolist": false,
        "is_visible_in_entery": true,
        "field_values": [],
        "validation": {
          "required": true
        },
      },
      {
        "_id": "632b00838b881013251e2a73",
        "field_label": "Gender",
        "field_name": "gender",
        "field_type": "radio",
        "iseditable": true,
        "isvisibletolist": false,
        "is_visible_in_entery": true,
        "field_values": [
          {
            "value_name": "male",
            "value_text": "Male"
          },
          {
            "value_name": "female",
            "value_text": "Female"
          }
        ],
      }
    ],
  }
}
```


## How to create dynamic forms:
- Create a new admin user to generate, view and edit forms: 

![image](https://user-images.githubusercontent.com/25265362/192757199-1bfcf8ec-b722-4cc6-bd8b-ddbb5db8dc42.png)

- After that Login with that user.

- Click on **Create new form** from the navigation bar on a top right side.

![image](https://user-images.githubusercontent.com/25265362/192757933-d95f44da-9235-4ee2-97cf-303db9347e63.png)

- Add form name and name of the submit button for your form.

![image](https://user-images.githubusercontent.com/25265362/192759045-01d8d466-733d-4c31-ba10-25f9f497ef20.png)

- Click on Add field button to add a new field for that form with validations.

![image](https://user-images.githubusercontent.com/25265362/192759549-89fdf690-3b29-4e97-a759-9dede22f8635.png)

- Once all require fileds are added for that form then click on submit form to create a new form.

![image](https://user-images.githubusercontent.com/25265362/192760199-36230887-b1ce-403c-8d93-9f7f05075181.png)

- Your form is generated 

![image](https://user-images.githubusercontent.com/25265362/192764329-a2004548-749d-4974-b5aa-49e596cd7663.png)

- You can update the form field type, label and validations and you can also add a new field for that form.

![image](https://user-images.githubusercontent.com/25265362/192766870-2f9d70a6-b735-440e-98f1-f6e7156fb696.png)

![image](https://user-images.githubusercontent.com/25265362/192767166-7925cfba-a888-4f7d-bf34-c1664d1b7ec2.png)

- Copy the form API URL ![image](https://user-images.githubusercontent.com/25265362/192770174-d7027f8f-fd99-4125-ac35-a1bbd50f8647.png)
to use this form in your another angular application by adding [@trootech/generate-dynamic-forms](https://www.npmjs.com/package/@trootech/generate-dynamic-forms) package in your applicaton.

- You just need to pass copied url in **fromUrl** of that package to generate dynamic form.

