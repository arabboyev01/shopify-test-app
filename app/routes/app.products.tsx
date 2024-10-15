import { Autocomplete, Box, Button, Card, ChoiceList, Icon, Layout, Page, Text } from "@shopify/polaris"
import { SearchIcon } from '@shopify/polaris-icons'
import { useMemo, useState, useCallback } from "react"


export default function Products() {

    const deselectedOptions = useMemo(
        () => [
            { value: 'rustic', label: 'Rustic' },
            { value: 'antique', label: 'Antique' },
            { value: 'vinyl', label: 'Vinyl' },
            { value: 'vintage', label: 'Vintage' },
            { value: 'refurbished', label: 'Refurbished' },
        ],
        [],
    );
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(deselectedOptions);

    const [selected, setSelected] = useState<string[]>(['hidden']);

    const handleChange = useCallback((value: string[]) => setSelected(value), []);

    const updateText = useCallback(
        (value: string) => {
            setInputValue(value);

            if (value === '') {
                setOptions(deselectedOptions);
                return;
            }

            const filterRegex = new RegExp(value, 'i');
            const resultOptions = deselectedOptions.filter((option) =>
                option.label.match(filterRegex),
            );
            setOptions(resultOptions);
        },
        [deselectedOptions],
    );

    const updateSelection = useCallback(
        (selected: string[]) => {
            const selectedValue = selected.map((selectedItem) => {
                const matchedOption = options.find((option) => {
                    return option.value.match(selectedItem);
                });
                return matchedOption && matchedOption.label;
            });

            setSelectedOptions(selected);
            setInputValue(selectedValue[0] || '');
        },
        [options],
    );

    const textField = (
        <Autocomplete.TextField
            onChange={updateText}
            label="Tags"
            value={inputValue}
            prefix={<Icon source={SearchIcon} tone="base" />}
            placeholder="Search"
            autoComplete="off"
        />
    );
    return (
        <Page title="Products">
            <Layout.Section>
                <ui-title-bar title="Products">
                    <button variant="primary" onClick={() => shopify.modal.show('product-modal')}>Click me</button>
                    {/* <Button variant="primary" onClick={() =>  shopify.toast.show('Hello pressed')}>Click me</Button> */}
                </ui-title-bar>
                <ui-modal id="product-modal">
                    <ui-title-bar title="Modal here">
                        <button variant="primary">OK</button>"
                    </ui-title-bar>
                    <Box padding="500">
                        This is where you will create the form to create a new product.
                    </Box>
                </ui-modal>
                <Card>
                    <Text as="h1" variant="bodyLg">Hello Text</Text>
                    <Button variant="primary" onClick={() => shopify.toast.show('Hello pressed')}>Show here</Button>
                        <Autocomplete
                            options={options}
                            selected={selectedOptions}
                            onSelect={updateSelection}
                            textField={textField}
                        />
                    <ChoiceList
                        title="Company name"
                        choices={[
                            { label: 'Hidden', value: 'hidden' },
                            { label: 'Optional', value: 'optional' },
                            { label: 'Required', value: 'required' },
                        ]}
                        selected={selected}
                        onChange={handleChange}
                    />
                </Card>
            </Layout.Section>
        </Page>
    )
}