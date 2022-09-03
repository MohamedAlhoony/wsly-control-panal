import React from 'react'
import {
    Modal,
    Header,
    Icon,
    Input,
    Form,
    Button,
    Label,
} from 'semantic-ui-react'
const SubscriptionUpdatePricesModal = (props) => {
    const {
        subscriptionUpdatePricesModal,
        closeSubscriptionUpdatePricesModal,
        handleUpdatePricesInputFieldChange,
        handleUpdatePricesOpTypeChange,
        submitSubscriptionPrices,
    } = props
    return (
        <Modal
            size="tiny"
            onClose={closeSubscriptionUpdatePricesModal}
            open={subscriptionUpdatePricesModal.show}
            closeOnDimmerClick={false}
            dimmer={'blurring'}
        >
            <Header textAlign={'center'}>
                <Icon name={'edit'} />
                تحديث الأسعار النسبية للإشتراك (
                {subscriptionUpdatePricesModal.subscription
                    ? subscriptionUpdatePricesModal.subscription.Name
                    : null}
                )
            </Header>
            <Modal.Content>
                {/* {!currencyExchangeValueModal.isLoading && (
                    <Message size={'tiny'} color={'red'}>
                        <Message.Header>انتبه!</Message.Header>
                        <p>
                            تغيير سعر الصرف يؤثر في أسعار جميع الفئات المرتبطة
                            بالعملة الرجاء الإنتباه عند اجراء العملية.
                        </p>
                    </Message>
                )} */}

                <Form
                    loading={subscriptionUpdatePricesModal.isLoading}
                    onSubmit={submitSubscriptionPrices}
                >
                    <Form.Group>
                        <Form.Field
                            required
                            width={'16'}
                            dir={'ltr'}
                            control={Input}
                            maxLength={6}
                            placeholder={'القيمة'}
                            value={
                                subscriptionUpdatePricesModal.rateValueFormInput
                                    .value
                            }
                            onChange={(event) => {
                                handleUpdatePricesInputFieldChange(
                                    event.target.value
                                )
                            }}
                            actionPosition={'left'}
                            action={
                                <Label
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {subscriptionUpdatePricesModal.opType === 1
                                        ? 'الأسعار مضروبة في '
                                        : 'الأسعار مقسومة على '}
                                </Label>
                            }
                        />
                    </Form.Group>
                    <Form.Group inline>
                        <label>نوع العملية: </label>
                        <Form.Radio
                            label="ضرب"
                            value={1}
                            checked={subscriptionUpdatePricesModal.opType === 1}
                            onChange={handleUpdatePricesOpTypeChange}
                        />
                        <Form.Radio
                            label="قسمة"
                            value={2}
                            checked={subscriptionUpdatePricesModal.opType === 2}
                            onChange={handleUpdatePricesOpTypeChange}
                        />
                    </Form.Group>

                    <Button className={'primary'}>تحديث</Button>
                    <Button onClick={closeSubscriptionUpdatePricesModal}>
                        إغلاق
                    </Button>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default SubscriptionUpdatePricesModal
