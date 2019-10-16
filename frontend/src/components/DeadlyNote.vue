<template>

    <v-app id="inspire">
        <v-content>
            <v-container fluid fill-height>
                <v-layout align-center justify-center>
                    <v-flex xs14 sm8 md4>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Deadly Note - Share notes securely</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-alert
                                        v-model="showAlert"
                                        :type="alertType"
                                        dismissible
                                >
                                    {{alertContent}}
                                </v-alert>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-textarea
                                            v-model="message"
                                            :rules="[v => !!v || 'Note text is required']"
                                            auto-grow
                                            filled
                                            color="deep-purple"
                                            :label="noteLabel"
                                            rows="5"
                                            id="messageContent"
                                            required
                                    ></v-textarea>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" v-if="!completed" @click="send">Generate</v-btn>
                                <v-btn color="success" v-if="completed" @click="copy">Copy and Erase</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    const api = '/notes';
    let secret = '';
    const urlHash = '#';

    export default {
        data() {
            return {
                message: '',
                form: false,
                email: '',
                numberOfViews: '1',
                noteLabel: 'Type here',
                showOptions: false,
                validOptions: false,
                valid: false,
                completed: false,
                errors: [],
                urlEncoded: '',
                showAlert: false,
                alertType: 'info',
                alertContent: ''
            }
        },
        mounted() {
            if (typeof this.$route.params.id != 'undefined') {
                this.noteLabel = '';
                let params = this.$route.params.id.split(urlHash);
                secret = location.hash.replace('#', '');
                axios
                    .get(`${api}/${params[0]}`)
                    .then(response => {
                        this.message = this.decrypt(response.data);
                        this.completed = true;
                        this.$router.push('/');
                    })
                    .catch(response => {
                        this.showAlertNotFound();
                        this.$router.push('/');
                    });
            }
        },
        methods: {
            clearForm() {
                this.$refs.form.reset();
            },
            send(e) {
                e.preventDefault();
                if (this.$refs.form.validate()) {

                    this.noteLabel = '';

                    const payload = {
                        note: this.encrypt(this.message),
                        numberOfViews: parseInt(this.numberOfViews),
                        email: this.email
                    };
                    axios
                        .post(api, payload)
                        .then(response => {
                            this.completed = true;
                            this.clearForm();
                            this.message = `${location.href}${response.data.id}${urlHash}${secret}`;
                        })
                        .catch(response => {
                            this.showAlert = true;
                            this.alertContent = response.message;
                            this.alertType = 'error';
                        });
                }

            },
            encrypt() {
                secret = CryptoJS.MD5(CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.random(32))).toString();
                return CryptoJS.AES.encrypt(this.message, secret).toString();
            },
            decrypt(encrypted) {
                return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
            },
            showAlertNotFound() {
                this.showAlert = true;
                this.alertContent = 'Oops, seems that this note never existed or it was already viewed.';
                this.alertType = 'error';
            },
            copy() {
                let testingCodeToCopy = document.querySelector('#messageContent');
                testingCodeToCopy.select();
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
                this.noteLabel = 'Type here';
                this.clearForm();
                this.completed = false;
            }
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
