import { Component, Vue } from 'vue-property-decorator';

@Component
export class EmailAddressFunctionsMixin extends Vue {

    validEmailAddress(recEmail: string): boolean{
        let emailTestRegex = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
          return emailTestRegex.test(recEmail);

    }
}