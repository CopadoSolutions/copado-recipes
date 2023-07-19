import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import RESULT_DATA_FIELD from '@salesforce/schema/copado__Result__c.copado__Result_Data__c';

import jsyamllib from "@salesforce/resourceUrl/jsyamllib";
import { loadScript } from 'lightning/platformResourceLoader';

export default class ResultTable extends LightningElement {
    @api recordId;
    @track relevantFormattedJson;
    _versionId;
    type;
    result = {};
    scriptsLoaded = false;
    formattedJson;

    @wire(getRecord, { recordId: '$recordId', fields: [RESULT_DATA_FIELD] })
    wiredRecord({ data }) {
        this.result = data;
        const serializedJson = getFieldValue(this.result, RESULT_DATA_FIELD);
        const { type, formattedJson } = this.getFormattedData(serializedJson);

        this.type = type;
        this.formattedJson = formattedJson;
        this.relevantFormattedJson = formattedJson;
    }

    async connectedCallback() {
        if (!this.scriptsLoaded) {
            await loadScript(this, jsyamllib);
            this.scriptsLoaded = true;
        }
    }

    get yamlData() {
        if (this.isYAML && this.scriptsLoaded) {
            return jsyaml.dump(this.formattedJson);
        }

        return '';
    }

    get recordCount() {
        return this.relevantFormattedJson?.length;
    }

    get columns() {
        if (this.type !== 'Table') {
            return [];
        }

        const allKeys = this.formattedJson.reduce((keys, item) => {
            return keys.concat(Object.keys(item));
        }, []);
        const uniqueKeys = [...new Set(allKeys)];

        return uniqueKeys.map(key => {
            return {
                label: key.charAt(0).toUpperCase() + key.slice(1),
                fieldName: key,
                type: 'text'
            };
        });
    }


    get isTabular() {
        return (this.type === 'Table' && this.columns.length);
    }


    get isYAML() {
        return (this.type === 'YAML' && this.formattedJson);
    }


    get isString() {
        return (this.type === 'String' && this.formattedJson);
    }

    getFormattedData(serializedJson) {
        try {
            const formattedJson = JSON.parse(serializedJson);
            if (formattedJson?.length) {
                return {
                    type: 'Table', formattedJson
                };
            } else {
                return {
                    type: 'YAML', formattedJson
                };
            }
        } catch (error) {
            return {
                type: 'String',
                formattedJson: serializedJson
            };
        }
    }

    handleSearch(event) {
        const searchTerm = event.target.value ? event.target.value.trim().toLowerCase() : '';

        if (!searchTerm) {
            this._clearSearch();
        } else {
            this._applySearch(searchTerm);
        }
    }

    b64DecodeUnicode(str) {
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    _clearSearch() {
        this.relevantFormattedJson = this.formattedJson;
    }


    _applySearch(searchTerm) {
        this.relevantFormattedJson = this.formattedJson.filter((row) => {
            for (const key in row) {
                const value = '' + row[key] || '';
                if (value && value.toLowerCase()?.includes(searchTerm)) {
                    return true;
                }
            }
            return false;
        });
    }
}