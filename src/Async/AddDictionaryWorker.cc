#include <napi.h>
#include <hunspell.hxx>
#include <string>
#include "Worker.cc"

class AddDictionaryWorker : public Worker {
    public:
        AddDictionaryWorker(
            HunspellContext* context,
            Napi::Promise::Deferred d,
            std::string dictionary,
            bool notpath)
        : Worker(context, d), dictionary(std::move(dictionary)), notpath(notpath) {}

    void Execute() {
        // Worker thread; don't use N-API here
        context->lockWrite();
        context->instance->add_dic(dictionary.c_str(), NULL, notpath);
        context->unlockWrite();
    }

    void Resolve(Napi::Promise::Deferred const &deferred) {
        Napi::Env env = deferred.Env();
        
        deferred.Resolve(env.Undefined());
    }

    private:
        std::string dictionary;
        bool notpath;
};