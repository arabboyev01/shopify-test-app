import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { Autocomplete, Box, Button, Card, Checkbox, ChoiceList, Form, FormLayout, Icon, Layout, Page, Text, TextField } from "@shopify/polaris"
import { SearchIcon } from '@shopify/polaris-icons'
import { useMemo, useState, useCallback } from "react"


export default function Products() {
    const [openModal, setOpenModal] = useState(false)

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

    const [newsletter, setNewsletter] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback(() => {
        setEmail('');
        setNewsletter(false);
    }, []);

    const handleNewsLetterChange = useCallback(
        (value: boolean) => setNewsletter(value),
        [],
    );

    const handleEmailChange = useCallback((value: string) => setEmail(value), []);
    const handlePasswordChange = useCallback((value: string) => setPassword(value), []);
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
                    <Button variant="primary" onClick={() => setOpenModal(!openModal)}>Open modal</Button>
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
                <Modal id="my-modal" open={openModal}>
                    <TitleBar title="Please login before procced"></TitleBar>
                    <div style={{ width: '100%', height: "100%", padding: "30px"}}>
                    <Form onSubmit={handleSubmit}>
                        <FormLayout>
                            <TextField
                                value={email}
                                onChange={handleEmailChange}
                                label="Email"
                                type="email"
                                autoComplete="email"
                                helpText={
                                    <span>
                                        Please enter your email
                                    </span>
                                }
                            />
                            <TextField
                                value={password}
                                onChange={handlePasswordChange}
                                label="Password"
                                type="password"
                                autoComplete="password"
                                helpText={
                                    <span>
                                        Please enter your password
                                    </span>
                                }
                            />
                             <Checkbox
                                label="Remember the password"
                                checked={newsletter}
                                onChange={handleNewsLetterChange}
                            />

                            <Button submit variant="primary">Submit</Button>
                        </FormLayout>
                    </Form>
                    </div>
                </Modal>
            </Layout.Section>
        </Page>
    )
}