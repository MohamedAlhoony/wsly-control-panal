import React from 'react'
import {
    Modal,
    Header,
    Icon,
    Input,
    Form,
    Message,
    Button,
    Label,
} from 'semantic-ui-react'
const CurrencyExchangeModal = (props) => {
    const {
        currencyExchangeValueModal,
        closeCurrencyExchangeValueModal,
        handleExchangeCurrencyInputFieldChange,
        submitCurrencyExchangeValue,
    } = props
    return (
        <Modal
            size="tiny"
            onClose={closeCurrencyExchangeValueModal}
            open={currencyExchangeValueModal.show}
            closeOnDimmerClick={false}
            dimmer={'blurring'}
        >
            <Header textAlign={'center'}>
                <Icon name={'exchange'} />
                تغيير سعر الصرف "
                {currencyExchangeValueModal.currency
                    ? currencyExchangeValueModal.currency.Name
                    : null}
                "
            </Header>
            <Modal.Content>
                {!currencyExchangeValueModal.isLoading && (
                    <Message size={'tiny'} color={'red'}>
                        <Message.Header>انتبه!</Message.Header>
                        <p>
                            تغيير سعر الصرف يؤثر في أسعار جميع الفئات المرتبطة
                            بالعملة الرجاء الإنتباه عند اجراء العملية.
                        </p>
                    </Message>
                )}

                <Form
                    loading={currencyExchangeValueModal.isLoading}
                    onSubmit={submitCurrencyExchangeValue}
                >
                    <Label pointing={'below'}>
                        سعر الصرف الحالي هو:&nbsp;
                        {
                            currencyExchangeValueModal.currentCurrencyExchangeValue
                        }
                    </Label>
                    <Form.Field
                        required
                        dir={'ltr'}
                        control={Input}
                        maxLength={6}
                        placeholder={'أدخل سعر الصرف الجديد هنا'}
                        value={
                            currencyExchangeValueModal.exchangeValueFormInput
                                .value
                        }
                        onChange={(event) => {
                            handleExchangeCurrencyInputFieldChange(
                                event.target.value
                            )
                        }}
                    />
                    <Button className={'primary'}>تغيير</Button>
                    <Button onClick={closeCurrencyExchangeValueModal}>
                        إغلاق
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default CurrencyExchangeModal
