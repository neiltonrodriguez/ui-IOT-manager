<template>
    <iframe class="w-full" height="450" :src="link"></iframe>
</template>
<script>
export default {
    props: {
        link: String,
    },
    data() {
        return {
            contas: [],                    
        };
    },
    methods: {
        
    }
    
}

</script>


<style scoped></style>