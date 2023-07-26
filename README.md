# Copado Recipes GitHub Repository
Welcome to the Copado Recipes GitHub repository! This repository contains sample components and recipes to help developers looking to extend or build on top of the Copado Platform to get quickly started. We'll be adding more components in the future.

## Introduction
A collection of easy-to-digest code examples for copado extension developers. Each recipe demonstrates how to code a specific task in the fewest lines of code possible, while following best practices.

## Features
`resultTable` component can be used by Copado extension developers to enhance the user experience when displaying result output from raw files or DataJSON related to a result record. By utilizing this component, developers can save time and effort in building their own result viewer from scratch and use this as a starting point.

![Logo](https://github.com/CopadoSolutions/copado-recipes/blob/main/docs/images/Table%20Picture.png)

## Installation
To use the result viewer component in your Copado extension project, follow these steps:

Clone the Copado Recipe GitHub repository and Include the result viewer component in your **project**:
```
git clone https://github.com/CopadoSolutions/copado-recipes.git
sf project deploy start -o [target-org] # source tracked environments

sf deploy metadata -o [target-org] # non-source tracked environments
```


## Usage
To use this component to display results outputs, you can enter the component name either in the `Job Step`'s or `Function`'s `Result Viewer Component` field as follows:
![Logo](https://github.com/CopadoSolutions/copado-recipes/blob/main/docs/images/Configure%20Function%20Result%20Viewer.png)

*The ResultViewer component accepts one parameters: `recordId` which is the result Id*

### Supported Formats
The result viewer component supports the following output formats:

* Table: Displays the log information in a tabular format with columns and rows(when data json is an Array of object).
* YAML: Parses the log data as YAML and presents it in a structured YAML format(when data json is a nested object with complex structure).
* Plain Text: Displays the log data as plain text without any formatting(when the data json is a String).

*Note: The component automatically detects the structure on JSON to display data in the most relevant format. If a specific JSON format is not supported in the example provided, you can modify this component and adjust it to your use case.*


## How to customize
* The default version (`resultTable.js`) support reading data from the `copado__Result_Data__c` field.
* If instead you want to read data from a File related to result record, use the `resultTableFromFile.js` sample code that will read from any file named `output.json`.  Change the file name if you need to read data from a different file.

## Contributing
We welcome contributions from the community to enhance and improve the result viewer component. To contribute, please follow these steps:

- Fork the repository and create a new branch.
- Make your changes and ensure they adhere to the existing code style.
- Write tests to validate your changes (if applicable).
- Commit your changes and push them to your forked repository.
- Submit a pull request, explaining the purpose and details of your changes.
- Our team will review your contribution and provide feedback as soon as possible.

## License
The Copado Recipe GitHub repository is licensed under the [MIT License]((https://github.com/ruslan-kurchenko/sfdc-lax/blob/master/docs/LICENSE)). For more information, please see the LICENSE file.

We hope this result viewer component serves as a valuable starting point for Copado extension developers to build a better user experience and efficiently display result output. If you have any questions or need further assistance, please don't hesitate to reach out to our developer advocate team. Happy coding!
